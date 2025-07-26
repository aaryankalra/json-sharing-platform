import { Github, Heart, Linkedin } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center px-8 sm:px-15 md:px-30 lg:px-48">
      <div className="flex flex-col gap-10">
        <div className="text-justify">
          <span className="text-lg font-bold nav-heading">
            {"<"}Share<span className="text-green-600">JSON</span>
            {"/>"}
          </span>{" "}
          makes it easy to work with data that’s usually hard to manage. If
          you’ve ever struggled to create or share structured information like
          lists of users, products or settings, this tool helps you do it
          without the confusion. You can quickly make changes, fix mistakes, and
          get a link to share with others in just a few clicks. Whether you're
          planning something with a team, organizing sample content, or just
          need a place to store and update your data, JSON Hub keeps everything
          simple and clear. No sign-up, no clutter. Just a straightforward way
          to create and share what you need, when you need it.
        </div>
        <div className="flex flex-col gap-2">
          <div>Made with ❤️ by Aaryan.</div>
          <div className="flex items-center gap-3">
            <a
              href={import.meta.env.VITE_GITHUB_LINK}
              target="_blank"
              className="hover:scale-110 transition-all"
            >
              <Github />
            </a>
            <a
              href={import.meta.env.VITE_LINKEDIN_LINK}
              target="_blank"
              className="hover:scale-110 transition-all"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
