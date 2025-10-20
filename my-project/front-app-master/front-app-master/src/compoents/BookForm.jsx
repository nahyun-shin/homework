import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { bookAPI } from "../service/bookService";

// ----------------- Yup 스키마 -----------------
const schema = yup.object().shape({
  title: yup.string().required("도서명을 입력해주세요"),
  subTitle: yup.string(),
  writer: yup.string().required("저자를 입력해주세요"),
  publisher: yup.string().required("출판사를 입력해주세요"),
  pubDate: yup.string().nullable(),
  bookQty: yup.number().typeError("수량을 입력해주세요").integer("정수만 입력").min(0, "0 이상").nullable(),
  price: yup.number().typeError("가격을 입력해주세요").required("가격을 입력해주세요").positive("양수만 가능"),
  categoryId: yup.number().typeError("카테고리를 선택해주세요").required("카테고리를 선택해주세요"),
  content: yup.string().required("도서 설명을 입력해주세요"),
  showYn: yup.boolean(),
  bannerYn: yup.boolean(),
});

function BookForm({ isEdit = false, bookId }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { showYn: true, stockYn: false, bannerYn: false },
  });

  const [categories, setCategories] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]); // 서버에서 내려온 기존 이미지
  const [files, setFiles] = useState([]); // 새로 선택한 File 객체
  const [mainIndex, setMainIndex] = useState(0);

  // ----------------- 카테고리 불러오기 -----------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await bookAPI.getCategoryMenus(false);
        setCategories(data);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };
    fetchCategories();
  }, []);

  // ----------------- 기존 도서 데이터 로드 (수정 시) -----------------
  useEffect(() => {
    if (isEdit && bookId) {
      const fetchBook = async () => {
        try {
          const book = await bookAPI.getAdminBook(bookId);
          reset({
            title: book.title || "",
            subTitle: book.subTitle || "",
            writer: book.writer || "",
            publisher: book.publisher || "",
            pubDate: book.pubDate || "",
            bookQty: book.bookQty ?? 0,
            price: book.price ?? 0,
            categoryId: book.categoryId ?? "",
            content: book.content || "",
            showYn: book.showYn ?? true,
            bannerYn: book.bannerYn ?? false,
            stockYn: book.stockYn ?? false,
          });

          // 기존 이미지
          if (book.fileList && Array.isArray(book.fileList)) setExistingFiles(book.fileList);
        } catch (err) {
          console.error("도서 정보 불러오기 실패:", err);
        }
      };
      fetchBook();
    }
  }, [isEdit, bookId, reset]);

  // ----------------- 새 파일 추가 -----------------
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (!newFile) return;
    setFiles(prev => [...prev, newFile]);
    e.target.value = "";
  };

  // ----------------- 기존 이미지 삭제 -----------------
  const handleRemoveExistingFile = (idx) => {
    setExistingFiles(prev => prev.filter((_, i) => i !== idx));
    if (mainIndex === idx) setMainIndex(0);
    else if (mainIndex > idx) setMainIndex(mainIndex - 1);
  };

  // ----------------- 새 파일 삭제 -----------------
  const handleRemoveFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    if (mainIndex === idx + existingFiles.length) setMainIndex(0);
    else if (mainIndex > idx + existingFiles.length) setMainIndex(mainIndex - 1);
  };

  // ----------------- submit -----------------
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // 기본 정보
      formData.append("title", data.title || "");
      formData.append("subTitle", data.subTitle || "");
      formData.append("writer", data.writer || "");
      formData.append("publisher", data.publisher || "");
      formData.append("pubDate", data.pubDate || "");
      formData.append("bookQty", data.bookQty ?? 0);
      formData.append("price", data.price ?? 0);
      formData.append("categoryId", data.categoryId ?? 0);
      formData.append("content", data.content || "");

      // Boolean 옵션
      formData.append("showYn", data.showYn ? "true" : "false");
      formData.append("bannerYn", data.bannerYn ? "true" : "false");
      const stockYnValue = (data.bookQty ?? 0) <= 0 ? "false" : data.stockYn ? "true" : "false";
      formData.append("stockYn", stockYnValue);

      // ----------------- 기존 이미지 imgId 전송 -----------------
      existingFiles.forEach(file => formData.append("existingFileIds", file.imgId));

      // ----------------- 새 파일 append -----------------
      files.forEach(file => formData.append("files", file));

      // ----------------- mainImageFlags 처리 -----------------
      const totalFiles = [...existingFiles, ...files];
      totalFiles.forEach((_, idx) => {
        formData.append("mainImageFlags", idx === mainIndex ? "true" : "false");
      });

      // ----------------- 서버 요청 -----------------
      if (isEdit) {
        await bookAPI.updateBook(bookId, formData);
        alert("도서가 수정되었습니다!");
      } else {
        await bookAPI.createBook(formData);
        alert("도서가 등록되었습니다!");
      }

      navigate("/admin/books");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(isEdit ? "도서 수정 중 오류가 발생했습니다." : "도서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="container">
      <header><h2>{isEdit ? "도서 수정" : "도서 등록"}</h2></header>
      <section className="book-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 기본 정보 */}
          <div className="mb-3">
            <label>도서명</label>
            <input type="text" {...register("title")} className="form-control" />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          <div className="mb-3">
            <label>부제목</label>
            <input type="text" {...register("subTitle")} className="form-control" />
          </div>

          <div className="mb-3">
            <label>저자</label>
            <input type="text" {...register("writer")} className="form-control" />
            {errors.writer && <p className="error">{errors.writer.message}</p>}
          </div>

          <div className="mb-3">
            <label>출판사</label>
            <input type="text" {...register("publisher")} className="form-control" />
            {errors.publisher && <p className="error">{errors.publisher.message}</p>}
          </div>

          <div className="mb-3">
            <label>출판일</label>
            <input type="date" {...register("pubDate")} className="form-control" />
          </div>

          <div className="mb-3">
            <label>수량</label>
            <input type="number" {...register("bookQty")} className="form-control" />
          </div>

          <div className="mb-3">
            <label>가격</label>
            <input type="number" {...register("price")} className="form-control" />
            {errors.price && <p className="error">{errors.price.message}</p>}
          </div>

          <div className="mb-3">
            <label>카테고리</label>
            <select {...register("categoryId", { valueAsNumber: true })} className="form-control">
              <option value="">카테고리를 선택하세요</option>
              {categories.map(cat => <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>)}
            </select>
            {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}
          </div>

          <div className="mb-3">
            <label>도서 설명</label>
            <textarea {...register("content")} className="form-control"></textarea>
            {errors.content && <p className="error">{errors.content.message}</p>}
          </div>

          {/* 옵션 */}
          <div className="mb-3 d-flex gap-3">
            <label><input type="checkbox" {...register("showYn")} /> 노출 여부</label>
            <label><input type="checkbox" {...register("bannerYn")} /> 배너 표시 여부</label>
          </div>

          {/* 이미지 추가 */}
          <div className="mb-3">
            <label>이미지 추가</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
          </div>

          {/* 이미지 미리보기 */}
          {(existingFiles.length + files.length) > 0 && (
            <div className="mb-3 image-preview-list">
              {existingFiles.map((file, idx) => (
                <div key={file.imgId} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <img src={file.imageUrl} alt={file.fileName} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }} />
                  <div>
                    <input type="radio" name="mainImage" checked={mainIndex === idx} onChange={() => setMainIndex(idx)} /> 대표 이미지
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveExistingFile(idx)}>삭제</button>
                </div>
              ))}

              {files.map((file, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }} />
                  <div>
                    <input type="radio" name="mainImage" checked={mainIndex === idx + existingFiles.length} onChange={() => setMainIndex(idx + existingFiles.length)} /> 대표 이미지
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveFile(idx)}>삭제</button>
                </div>
              ))}
            </div>
          )}

          {/* 버튼 */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-outline-primary">{isEdit ? "수정" : "등록"}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/books")}>취소</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default BookForm;
