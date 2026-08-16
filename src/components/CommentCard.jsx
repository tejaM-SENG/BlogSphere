function CommentCard({ comment }) {
  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body">

        {/* User Name */}
        <h6 className="fw-bold mb-1">
          {comment.user}
        </h6>

        {/* Comment Text */}
        <p className="mb-0 text-muted">
          {comment.comment}
        </p>

      </div>
    </div>
  );
}

export default CommentCard;