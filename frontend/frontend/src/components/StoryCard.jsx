import "./StoryCard.css";

function StoryCard({ story }) {
  return (
    <div className="story-card">

      <img
        src={story.image}
        alt={story.name}
      />

      <div className="story-content">

        <span className="badge">
          {story.category}
        </span>

        <h3>{story.name}</h3>

        <h4>{story.institution}</h4>

        <p>{story.story}</p>

        <div className="story-footer">

          <span>
            Sponsored: ₹{story.amount.toLocaleString()}
          </span>

          <button>Read More</button>

        </div>

      </div>

    </div>
  );
}

export default StoryCard;