import Modal from './Modal';

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  return (
    <Modal title="حذف کار" onClose={onCancel}>
      <div className="px-5 py-5">
        <p className="leading-7 text-slate-700">
          آیا از حذف «<span className="font-bold">{task.title}</span>» مطمئن هستید؟ این کار قابل بازگشت نیست.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            حذف کار
          </button>
        </div>
      </div>
    </Modal>
  );
}
