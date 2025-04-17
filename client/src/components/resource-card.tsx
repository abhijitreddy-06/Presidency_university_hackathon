import { Book, Heart, Droplet, Activity } from "lucide-react";

interface ResourceCardProps {
  type: "article" | "video";
  title: string;
  category: "diabetes" | "heart" | "kidney" | "liver";
  description?: string;
  author?: string;
  duration?: string;
  linkUrl: string;
}

export default function ResourceCard({
  type,
  title,
  category,
  description,
  author,
  duration,
  linkUrl,
}: ResourceCardProps) {
  const renderIcon = () => {
    switch (category) {
      case "diabetes":
        return <Book className="text-primary text-3xl mb-4" />;
      case "heart":
        return <Heart className="text-primary text-3xl mb-4" />;
      case "kidney":
        return <Droplet className="text-primary text-3xl mb-4" />;
      case "liver":
        return <Activity className="text-primary text-3xl mb-4" />;
      default:
        return <Book className="text-primary text-3xl mb-4" />;
    }
  };

  if (type === "article") {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderIcon()}
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => {
            // Prevent default behavior for placeholder URLs
            if (linkUrl.startsWith('#')) {
              e.preventDefault();
              // Show a message instead of trying to open these placeholder URLs
              alert("This is a placeholder link for demonstration purposes only.");
            } else if (!linkUrl.startsWith('http')) {
              e.preventDefault();
              window.open(`https://${linkUrl}`, '_blank');
            }
          }}
          className="text-primary font-medium hover:underline inline-flex items-center"
        >
          Read More 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    );
  } else {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <a 
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // Prevent default behavior for placeholder URLs
            if (linkUrl.startsWith('#')) {
              e.preventDefault();
              // Show a message instead of trying to open these placeholder URLs
              alert("This is a placeholder link for demonstration purposes only.");
            } else if (!linkUrl.startsWith('http')) {
              e.preventDefault();
              window.open(`https://${linkUrl}`, '_blank');
            }
          }}
          className="block"
        >
          <div className="h-48 bg-neutral-200 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Watch Video</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400 group-hover:text-primary transition-colors"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-neutral-800">{title}</h4>
            <p className="text-neutral-600 text-sm mt-1">
              {author} • {duration}
            </p>
          </div>
        </a>
      </div>
    );
  }
}
