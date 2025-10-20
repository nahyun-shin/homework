import React from "react";
import { useParams } from "react-router";
import BookForm from "../../compoents/BookForm";

export default function EditBook() {
  const { bookId } = useParams();
  return <BookForm isEdit={true} bookId={bookId} />;
}