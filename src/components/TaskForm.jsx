import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { CATEGORIES, PRIORITIES } from "../utils/constants";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-teal-600 focus:outline-none";

function validate(values) {
  const errors = {};
  const title = values.title.trim();

  if (title === "") errors.title = "عنوان کار را وارد کنید.";
  else if (title.length < 3) errors.title = "عنوان باید حداقل ۳ حرف باشد.";
  else if (title.length > 80) {
    errors.title = "عنوان نباید بیشتر از ۸۰ حرف باشد.";
  }

  if (values.description.length > 300) {
    errors.description = "توضیحات نباید بیشتر از ۳۰۰ حرف باشد.";
  }

  return errors;
}

function getPickerValue(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return "";

  return new DateObject({
    year,
    month,
    day,
    calendar: gregorian,
    locale: gregorian_en,
  }).convert(persian, persian_fa);
}

function getGregorianDateString(dateObject) {
  if (!dateObject) return "";

  const date = new DateObject(dateObject).convert(gregorian, gregorian_en);

  const year = String(date.year).padStart(4, "0");
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function TaskForm({ task, onSave, onClose }) {
  const isEditing = Boolean(task);

  const [values, setValues] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    category: task?.category ?? CATEGORIES[0],
    priority: task?.priority ?? "medium",
    dueDate: task?.dueDate ?? "",
  });

  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundErrors = validate(values);

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    onSave({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    });
  };

  return (
    <Modal
      title={isEditing ? "ویرایش کار" : "افزودن کار جدید"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4 px-5 py-5">
        <div>
          <label htmlFor="title" className="text-sm font-medium">
            عنوان
          </label>

          <input
            id="title"
            name="title"
            ref={titleRef}
            value={values.title}
            onChange={handleChange}
            placeholder="یادگیری ری اکت"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={`${fieldClass} ${errors.title ? "border-rose-500" : ""}`}
          />

          {errors.title && (
            <p id="title-error" className="mt-1 text-xs text-rose-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium">
            توضیحات{" "}
            <span className="font-normal text-slate-500">(اختیاری)</span>
          </label>

          <textarea
            id="description"
            name="description"
            rows={3}
            value={values.description}
            onChange={handleChange}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
            className={`${fieldClass} resize-none ${
              errors.description ? "border-rose-500" : ""
            }`}
          />

          {errors.description && (
            <p id="description-error" className="mt-1 text-xs text-rose-600">
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className="text-sm font-medium">
              دسته‌بندی
            </label>

            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className={fieldClass}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="text-sm font-medium">
              اولویت
            </label>

            <select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className={fieldClass}
            >
              {Object.entries(PRIORITIES).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-1.5 block text-sm font-medium"
            >
              موعد انجام
            </label>

            <DatePicker
              value={getPickerValue(values.dueDate)}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass={fieldClass}
              placeholder="انتخاب تاریخ"
              onChange={(dateObject) => {
                setValues((prev) => ({
                  ...prev,
                  dueDate: getGregorianDateString(dateObject),
                }));
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            {isEditing ? "ذخیرهٔ تغییرات" : "افزودن کار"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
