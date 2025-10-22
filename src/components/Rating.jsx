const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = selected ? 'text-yellow-400' : 'text-slate-300';
  const baseStyle = 'text-xl mr-0.5';
  const mixStyle = `${baseStyle} ${className}`;
  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={mixStyle}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

export default function Rating({
  className,
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
}) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
