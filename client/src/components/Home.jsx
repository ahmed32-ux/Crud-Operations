
import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../../axiousInstance";

function Home() {
  const [bookForm, setBookForm] = useState({
    bookName: "",
    bookTitle: "",
    Author: "",
    price: "",
    publishDate: "",
  });

  const [booklists, setBookList] = useState([]);

  // GET: Fetch all books
  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");

      // Backend response: { books: [...] }
      setBookList(data?.books || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);
  



  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // POST: Add book
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookForm.bookName.trim() ||
      !bookForm.bookTitle.trim() ||
      !bookForm.Author.trim() ||
      bookForm.price === "" ||
      bookForm.publishDate === ""
    ) {
      alert("All fields are required");
      return;
    }

    if (!Number.isFinite(Number(bookForm.price)) || Number(bookForm.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      const { data } = await bookBaseUrl.post("addbook", bookForm);

      if (data?.Success) {
        alert(data.Message || "Book added successfully!");

        // Refresh books table
        await getAllbookList();

        // Clear form
        setBookForm({
          bookName: "",
          bookTitle: "",
          Author: "",
          price: "",
          publishDate: "",
        });
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.Message || "Failed to add book"
      );
    }
  };
  const handleDelete = async (id) => {
  try {
    const { data } = await bookBaseUrl.delete("deletebook", {
      data: { id },
      
    });
    console.log("Book ID:", id);

    if (data?.Success) {
      alert(data.Message || "Book deleted successfully!");
      await getAllbookList();
    } else {
      alert(data?.Message || "Book not found");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert(error.response?.data?.Message || "Failed to delete book");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Book Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Book Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-200">
                Book Name
              </label>
              <input
                type="text"
                name="bookName"
                placeholder="Enter book name"
                value={bookForm.bookName}
                onChange={handleOnChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-white"
              />
            </div>

            {/* Book Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-200">
                Book Title
              </label>
              <input
                type="text"
                name="bookTitle"
                placeholder="Enter book title"
                value={bookForm.bookTitle}
                onChange={handleOnChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-white"
              />
            </div>

            {/* Author */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-200">
                Author Name
              </label>
              <input
                type="text"
                name="Author"
                placeholder="Enter author name"
                value={bookForm.Author}
                onChange={handleOnChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-white"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-200">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={bookForm.price}
                onChange={handleOnChange}
                min="0"
                required
                className="w-full min-w-0 rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-white"
              />
            </div>

            {/* Publish Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-200">
                Publish Date
              </label>
              <input
                type="date"
                name="publishDate"
                value={bookForm.publishDate}
                onChange={handleOnChange}
                required
                className="w-full min-w-0 rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-white scheme-dark"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Books Table */}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-700 shadow-xl">
          <table className="w-full min-w-[800px] text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-xs uppercase text-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Book Name</th>
                <th className="px-6 py-4">Book Title</th>
                <th className="px-6 py-4">Author Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {booklists.map((book, index) => (
                <tr
                  key={book._id}
                  className="border-t border-slate-700 bg-slate-900 hover:bg-slate-800"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-white">
                    {book.bookName}
                  </td>

                  <td className="px-6 py-4">{book.bookTitle}</td>

                  <td className="px-6 py-4">{book.Author}</td>

                  <td className="px-6 py-4">{book.price}</td>

                  <td className="px-6 py-4">
                    {book.publishDate
                      ? String(book.publishDate).slice(0, 10)
                      : ""}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Home;
