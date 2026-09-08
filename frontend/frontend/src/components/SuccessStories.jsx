import "./SuccessStories.css";
import StoryCard from "./StoryCard";

function SuccessStories() {

  const stories = [

    {
      id: 1,
      name: "Priya Sharma",
      institution: "JNTU Hyderabad",
      category: "Scholarship",
      amount: 150000,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
      story:
        "With the support of KindBridge donors, Priya successfully completed her engineering degree and secured a software developer position."
    },

    {
      id: 2,
      name: "Rahul Kumar",
      institution: "Government Degree College",
      category: "College Fees",
      amount: 80000,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
      story:
        "Rahul received financial assistance for his college tuition and is now preparing for civil services."
    },

    {
      id: 3,
      name: "Sneha Reddy",
      institution: "ZP High School",
      category: "Books",
      amount: 20000,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700",
      story:
        "KindBridge provided books and study materials that helped Sneha excel in her board examinations."
    }

  ];

  return (

    <section className="stories-section">

      <h2>Success Stories</h2>

      <p>
        Every contribution creates a brighter future.
      </p>

      <div className="stories-grid">

        {stories.map((story) => (

          <StoryCard
            key={story.id}
            story={story}
          />

        ))}

      </div>

    </section>

  );
}

export default SuccessStories;