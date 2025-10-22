export default function Button({
  className = '',
  variant = 'primary',
  ...props
}) {
  const baseStyles = 'text-lg font-semibold border-none rounded-md p-2';
  const variants = {
    primary: 'bg-brand text-gray-50 hover:bg-brand/80 px-3 ml-1',
    ghost: 'bg-transparent text-sm text-zinc-600 hover:text-black',
    danger: 'bg-transparent text-sm text-red-500 hover:text-red-700',
  };

  const mergedClassName = `${baseStyles} ${
    variants[variant] || ''
  } ${className}`;

  return <button className={mergedClassName} {...props} />;
}
