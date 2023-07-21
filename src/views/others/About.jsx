import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-2 md:px-0 py-20 md:py-24">
      <section className="flex w-full justify-center pt-16">
        <div className="w-full md:w-8/12 space-y-10">
          <article className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-700">About Us</h1>
            <p className="text-lg text-gray-800 " style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              Welcome to <b>Post Master</b>, your one-stop solution for seamless
              social media management. Our platform is designed to simplify the
              process of connecting, scheduling, and automating posts on
              Facebook, Telegram, and Twitter. With our user-friendly interface
              and powerful features, we aim to empower individuals, businesses,
              and communities to enhance their social media presence with less
              effort.
            </p>
          </article>

          <article className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-700">Why Choose Post Master?</h1>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              At <b>Post Master</b>, we believe in making social media management
              accessible to everyone. Whether you're a social media enthusiast,
              a small business owner, or a digital marketing professional, our
              platform is tailored to meet your unique needs. For example, if
              you want to Connect to your Facebook Page, you will simply provide
              the Page ID of your Facebook page, and you'll be ready to go.
              Don't worry if you're unsure how to get the Page ID; our
              comprehensive documentation under <Link to="/docs" className="text-green-500 hover:underline">docs</Link> will guide you through the
              process step-by-step.
            </p>
          </article>

          <article className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-700">Quick App Configuration</h1>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              Once you create an app on our platform, you won't have to wait for
              long for it to be configured. Our efficient team ensures that your
              app is up and running within 5 hours, so you can start scheduling
              posts and messages without delay.
            </p>
          </article>

          <article className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-700">Post Master Schedulers</h1>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              Our scheduler is the heart of our application, and it's designed
              to make your social media management a breeze. But what exactly is
              a scheduler and how does it work?
            </p>

            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              A scheduler in our application acts as your assistant for handling
              social media updates. You have the flexibility to add multiple
              message contents, images, and even links to your scheduler. Once
              everything is set up, you can specify the time interval at which
              you want the scheduler to run.
            </p>

            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              For example, let's say you've added four message contents and two
              images to the scheduler. If you set it to run every hour, the
              scheduler will automatically post or send a message to your social
              media accounts using the first image and the first message content
              during the first hour. When it runs again after an hour, it will
              move on to the second message and the second image, and so on.
            </p>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              This sequential pattern continues until all the images and
              messages have been posted. Once the scheduler reaches the end of
              the list, it seamlessly starts again from the beginning,
              re-posting or re-sending the first message and image. This ensures
              that your social media accounts are consistently updated with
              fresh content, even when you're busy with other tasks.
            </p>
          </article>

          <article className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-700">Our Commitment to You</h1>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              At <b>Post Master</b>, we are committed to providing a seamless
              experience for all our users. Our platform is equipped with robust
              security measures to protect your data and privacy. Moreover, our
              dedicated support team is always available to assist you with any
              questions or issues you may encounter.
            </p>
          </article>

          <article className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-700">Get Started Today!</h1>
            <p className="text-lg text-gray-800" style={{letterSpacing:'1px',wordSpacing:'2px'}}>
              Embrace the power of automation and take your social media
              presence to new heights. Join <Link to='/login' className="underline text-green-700">Post Master</Link> and experience the
              convenience of effortless social media management. Whether you
              want to engage your audience with captivating posts or streamline
              communication with your Facebook, Telegram or Twitter, our
              platform has you covered. Don't miss out on the opportunity to
              elevate your social media strategy. Sign up today and let Post
              Master empower your online presence!
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default About;
