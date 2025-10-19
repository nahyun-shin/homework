// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router";
// import { bookAPI } from "../../service/bookService";

// const schema = yup.object().shape({
//   title: yup.string().required("도서명을 입력해주세요"),
//   writer: yup.string().required("저자를 입력해주세요"),
//   publisher: yup.string().required("출판사를 입력해주세요"),
//   price: yup
//     .number()
//     .typeError("숫자를 입력해주세요")
//     .required("가격을 입력해주세요")
//     .positive("양수만 가능합니다"),
//   categoryId: yup
//     .number()
//     .typeError("카테고리를 선택해주세요")
//     .required("카테고리를 선택해주세요"),
//   content: yup.string().required("도서 설명을 입력해주세요"),
// });

// function CreateBook() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [categories, setCategories] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [mainIndex, setMainIndex] = useState(0);

//   // ✅ 카테고리 목록 (전체보기 제거)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await bookAPI.getCategoryMenus(false); // ✅ 전체보기 제외
//         setCategories(data);
//       } catch (err) {
//         console.error("카테고리 불러오기 실패:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ✅ 이미지 추가 (한 번에 하나씩)
//   const handleFileChange = (e) => {
//     const newFile = e.target.files[0];
//     if (!newFile) return;

//     setFiles((prev) => [...prev, newFile]);
//     setValue("files", [...files, newFile]);
//     e.target.value = ""; // 파일 선택 후 input 초기화 (같은 파일 재선택 가능)
//   };

//   // ✅ 이미지 삭제
//   const handleRemoveFile = (index) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     setFiles(updatedFiles);

//     // 대표 이미지 삭제 시 인덱스 보정
//     if (mainIndex === index) setMainIndex(0);
//     else if (mainIndex > index) setMainIndex(mainIndex - 1);

//     setValue("files", updatedFiles);
//   };

//   // ✅ 도서 등록
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("subTitle", data.subTitle);
//       formData.append("writer", data.writer);
//       formData.append("publisher", data.publisher);
//       formData.append("pubDate", data.pubDate);
//       formData.append("bookQty", data.bookQty || 0);
//       formData.append("price", data.price);
//       formData.append("categoryId", data.categoryId);
//       formData.append("content", data.content);

//       // ✅ Boolean 옵션들
//       formData.append("showYn", data.showYn || false);
//       formData.append("stockYn", data.stockYn || false);
//       formData.append("bannerYn", data.bannerYn || false);

//       // ✅ 이미지와 대표 여부
//       files.forEach((file, idx) => {
//         formData.append("files", file);
//         formData.append("mainImageFlags", idx === mainIndex);
//       });

//       // FormData 내용 확인
//       console.log("=== FormData 내용 ===");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, ":", value);
//       }

//       const result = await bookAPI.createBook(formData);
//       if (result) {
//         alert("도서가 등록되었습니다!");
//         navigate("/admin/books");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("도서 등록 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <main className="container">
//       <header>
//         <h2>📚 도서 등록</h2>
//       </header>

//       <section className="book-form">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* 기본정보 */}
//           <div className="mb-3">
//             <label>도서명</label>
//             <input
//               type="text"
//               {...register("title")}
//               className="form-control"
//             />
//             {errors.title && <p className="error">{errors.title.message}</p>}
//           </div>
//           <div className="mb-3">
//             <label>부제목</label>
//             <input
//               type="text"
//               {...register("subTitle")}
//               className="form-control"
//             />
//           </div>

//           <div className="mb-3">
//             <label>저자</label>
//             <input
//               type="text"
//               {...register("writer")}
//               className="form-control"
//             />
//             {errors.writer && <p className="error">{errors.writer.message}</p>}
//           </div>

//           <div className="mb-3">
//             <label>출판사</label>
//             <input
//               type="text"
//               {...register("publisher")}
//               className="form-control"
//             />
//             {errors.publisher && (
//               <p className="error">{errors.publisher.message}</p>
//             )}
//           </div>
//           <div className="mb-3">
//             <label>출판일</label>
//             <input
//               type="date"
//               {...register("pubDate")}
//               className="form-control"
//             />
//             {errors.pubDate && (
//               <p className="error">{errors.pubDate.message}</p>
//             )}
//           </div>
//           <div className="mb-3">
//             <label>수량</label>
//             <input
//               type="number"
//               {...register("bookQty")}
//               className="form-control"
//             />
//             {errors.bookQty && (
//               <p className="error">{errors.bookQty.message}</p>
//             )}
//           </div>

//           <div className="mb-3">
//             <label>가격</label>
//             <input
//               type="number"
//               {...register("price")}
//               className="form-control"
//             />
//             {errors.price && <p className="error">{errors.price.message}</p>}
//           </div>

//           <div className="mb-3">
//             <label>카테고리</label>
//             <select
//               {...register("categoryId", { valueAsNumber: true })}
//               className="form-control"
//             >
//               <option value="">카테고리를 선택하세요</option>
//               {categories.map((cat) => (
//                 <option key={cat.categoryId} value={cat.categoryId}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {errors.categoryId && (
//               <p className="error">{errors.categoryId.message}</p>
//             )}
//           </div>

//           <div className="mb-3">
//             <label>도서 설명</label>
//             <textarea
//               {...register("content")}
//               className="form-control"
//             ></textarea>
//             {errors.content && (
//               <p className="error">{errors.content.message}</p>
//             )}
//           </div>

//           {/* ✅ 옵션 */}
//           <div className="mb-3 d-flex gap-3">
//             <label>
//               <input type="checkbox" {...register("showYn")} /> 노출 여부
//             </label>
//             <label>
//               <input type="checkbox" {...register("stockYn")} /> 재고 여부
//             </label>
//             <label>
//               <input type="checkbox" {...register("bannerYn")} /> 배너 표시 여부
//             </label>
//           </div>

//           {/* ✅ 이미지 등록 */}
//           <div className="mb-3">
//             <label>이미지 추가</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="form-control"
//             />
//           </div>

//           {/* ✅ 이미지 미리보기 및 삭제 */}
//           {files.length > 0 && (
//             <div className="mb-3">
//               <label>이미지 목록</label>
//               <div className="image-preview-list">
//                 {files.map((file, idx) => {
//                   const previewUrl = URL.createObjectURL(file);
//                   return (
//                     <div
//                       key={idx}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         marginBottom: "8px",
//                       }}
//                     >
//                       <img
//                         src={previewUrl}
//                         alt={`preview-${idx}`}
//                         style={{
//                           width: "80px",
//                           height: "80px",
//                           objectFit: "cover",
//                           borderRadius: "6px",
//                           border: "1px solid #ddd",
//                         }}
//                       />
//                       <div>
//                         <input
//                           type="radio"
//                           name="mainImage"
//                           checked={mainIndex === idx}
//                           onChange={() => setMainIndex(idx)}
//                         />{" "}
//                         대표 이미지
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleRemoveFile(idx)}
//                       >
//                         삭제
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* 버튼 */}
//           <div className="form-buttons">
//             <button
//               type="submit"
//               className="btn btn-outline-primary"
              
//             >
//               등록
//             </button>
//             <button type="button" className="btn btn-outline-secondary">
//               취소
//             </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// }

// export default CreateBook;
// ✅ CreateBook.jsx (Yup 유지 + FormData 타입 맞춤)
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { bookAPI } from "../../service/bookService";

// ----------------- Yup 스키마 -----------------
const schema = yup.object().shape({
  title: yup.string().required("도서명을 입력해주세요"),
  subTitle: yup.string(),
  writer: yup.string().required("저자를 입력해주세요"),
  publisher: yup.string().required("출판사를 입력해주세요"),
  pubDate: yup.date().nullable(),
  bookQty: yup
    .number()
    .typeError("수량을 입력해주세요")
    .integer("정수만 입력 가능합니다")
    .min(0, "0 이상 입력해주세요")
    .nullable(),
  price: yup
    .number()
    .typeError("가격을 입력해주세요")
    .required("가격을 입력해주세요")
    .positive("양수만 가능합니다"),
  categoryId: yup
    .number()
    .typeError("카테고리를 선택해주세요")
    .required("카테고리를 선택해주세요"),
  content: yup.string().required("도서 설명을 입력해주세요"),
  showYn: yup.boolean(),
  stockYn: yup.boolean(),
  bannerYn: yup.boolean(),
  files: yup
    .mixed()
    .test(
      "required",
      "이미지를 최소 1개 선택해주세요",
      (value) => value && value.length > 0
    ),
});

function CreateBook() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      showYn: true,
      stockYn: false,
      bannerYn: false,
    },
  });

  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [mainIndex, setMainIndex] = useState(0);

  // ----------------- 카테고리 가져오기 -----------------
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

  // ----------------- 이미지 추가 -----------------
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (!newFile) return;

    setFiles((prev) => [...prev, newFile]);
    setValue("files", [...files, newFile]);
    e.target.value = "";
  };

  // ----------------- 이미지 삭제 -----------------
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    if (mainIndex === index) setMainIndex(0);
    else if (mainIndex > index) setMainIndex(mainIndex - 1);

    setValue("files", updatedFiles);
  };

  // ----------------- 도서 등록 -----------------
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // ----------------- 기본 정보 -----------------
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle || "");
      formData.append("writer", data.writer);
      formData.append("publisher", data.publisher);

      // pubDate -> yyyy-MM-dd 형식
      const pubDateStr =
        data.pubDate instanceof Date
          ? data.pubDate.toISOString().slice(0, 10)
          : "";
      formData.append("pubDate", pubDateStr);

      // bookQty -> undefined/null일 경우 0
      formData.append("bookQty", data.bookQty ?? 0);

      formData.append("price", data.price);
      formData.append("categoryId", data.categoryId);
      formData.append("content", data.content);

      // ----------------- Boolean 옵션 -----------------
      formData.append("showYn", data.showYn ? "true" : "false");
      formData.append("stockYn", data.stockYn ? "true" : "false");
      formData.append("bannerYn", data.bannerYn ? "true" : "false");

      // ----------------- 이미지 + 대표 여부 -----------------
      files.forEach((file, idx) => {
        formData.append("files", file);
        formData.append("mainImageFlags", idx === mainIndex ? "true" : "false");
      });

      // ----------------- FormData 확인 -----------------
      console.log("=== FormData 내용 확인 ===");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      // ----------------- 서버 요청 -----------------
      const result = await bookAPI.createBook(formData);
      console.log("서버요청결과:"+result);
      alert("도서가 등록되었습니다!");
      navigate("/admin/books");
      
    } catch (error) {
      console.error(error);
      alert("도서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="container">
      <header>
        <h2>📚 도서 등록</h2>
      </header>

      <section className="book-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 기본정보 */}
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
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
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
            <label>
              <input type="checkbox" {...register("showYn")} /> 노출 여부
            </label>
            <label>
              <input type="checkbox" {...register("stockYn")} /> 재고 여부
            </label>
            <label>
              <input type="checkbox" {...register("bannerYn")} /> 배너 표시 여부
            </label>
          </div>

          {/* 이미지 등록 */}
          <div className="mb-3">
            <label>이미지 추가</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
          </div>

          {/* 이미지 미리보기 */}
          {files.length > 0 && (
            <div className="mb-3">
              <label>이미지 목록</label>
              <div className="image-preview-list">
                {files.map((file, idx) => {
                  const previewUrl = URL.createObjectURL(file);
                  return (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <img
                        src={previewUrl}
                        alt={`preview-${idx}`}
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }}
                      />
                      <div>
                        <input type="radio" name="mainImage" checked={mainIndex === idx} onChange={() => setMainIndex(idx)} /> 대표 이미지
                      </div>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveFile(idx)}>삭제</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-outline-primary">등록</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/books")}>취소</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateBook;
