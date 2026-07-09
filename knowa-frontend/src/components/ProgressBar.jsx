function ProgressBar({
  current,
  total,
}) {
  const progress =
    total > 0
      ? ((current + 1) / total) * 100
      : 0;

  return (
    <div className="progress-wrapper">
      <div
        className="progress-fill"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;