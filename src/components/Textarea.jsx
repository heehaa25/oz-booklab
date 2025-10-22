export default function Textarea({ className = '', ...props }) {
  const baseStyles =
    'h-30 bg-gray-50 border-zinc-500  py-2 px-4 placeholder-zinc-500 rounded-md border-none outline-none focus:focus:ring-2 focus:ring-brand/30';
  const classNames = `${baseStyles} ${className}`;

  return <textarea className={classNames} {...props} />;
}
