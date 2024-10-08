import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addCategory } from "../../services/admin";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });  

  const { mutate, data, isLoading, error } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
    // setForm({ name: "", slug: "", icon: "" });
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className="mx-auto mb-6 mt-4"
    >
      <span className="flex justify-between items-center">
        <h3 className="mb-4 border-b-2 text-neutral-100 border-solid border-rose-600 w-fit pb-1 -mr-3">
          دسته بندی جدید
        </h3>
        <Link to="/user">
          <IoMdArrowRoundBack className="w-6 h-6 text-neutral-100" />
        </Link>
      </span>
      <div className="gap-3">
        {!!error && (
          <p className="bg-red-800 text-white mb-5 p-1 text-center rounded-md">
            مشکلی پیش آمده است
          </p>
        )}
        {/* {data?.status === 201 &&
          // <p className="bg-red-800 text-white mb-5 p-1 text-center rounded-md">
          //   دسته بندی با موفقیت اضافه شد
          // </p>
          alert("دسته بندی با موفقیت اضافه شد")} */}

        <span className="gap-1">
          <label htmlFor="name" className="flex text-neutral-200 text-sm mb-3">
            دسته بندی
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-72 p-1 rounded-md mb-8 text-neutral-200 bg-neutral-800 border border-neutral-500 outline-none focus:ring-rose-700 focus:ring-1"
          />
        </span>
        <span className="gap-1">
          <label htmlFor="slug" className="flex text-neutral-200 text-sm mb-3">
            اسلاگ
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            className="block w-72 p-1 rounded-md mb-8 text-neutral-200 border bg-neutral-800 border-neutral-500 outline-none focus:ring-rose-700 focus:ring-1"
          />
        </span>
        <span className="gap-1">
          <label htmlFor="icon" className="flex text-neutral-200 text-sm mb-3">
            آیکون
          </label>
          <input
            type="text"
            name="icon"
            id="icon"
            className="block w-72 p-1 rounded-md mb-8 text-neutral-200 bg-neutral-800 border border-neutral-500 outline-none focus:ring-rose-700 focus:ring-1"
          />
        </span>
        <button
          type="submit"
          className="bg-rose-500 text-neutral-800 border-none h-9 px-6 rounded-md cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          ایجاد
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
