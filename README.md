# Aceflow

Aceflow is an Ed-Tech tool that generates short quizzes of 10 multiple-choice questions from various information sources like PDFs, YouTube videos, and URLs to help students prepare for their tests. It leverages ChatGPT for quiz generation and also includes an AI tutor feature to assist with quiz answers. **Note: This project is no longer actively supported.**

## Tech Stack

- **Frontend Framework**: React
- **State Management**: React Hook Form
- **CSS Framework**: Tailwind CSS, PostCSS
- **Large Language Model (LLM)**: OpenAI (ChatGPT)
- **ORM**: Prisma
- **Payment Processing**: Stripe
- **Animation**: Framer Motion
- **Cloud Platform**: Vercel
- **Database**: Firebase (initially used), PostgreSQL (current)
- **Package Manager**: npm
- **Security**: NextAuth.js for authentication
- **Server-Side Rendering (SSR) Framework**: Next.js

## Live Demo

Try out Aceflow directly without any installation! Visit the live demo hosted on Vercel:

[**Aceflow Live Demo**](https://aceflow-quiz.vercel.app)

### Current Status

- **Functional Features**: 
  - PDF and URL input for quiz generation are fully functional as of September 2, 2024.
  - The AI tutor feature is available for helping answer quiz questions.
  - Light and dark mode options are available for user preference.
- **Known Issues**: 
  - YouTube video processing is currently not working.

## Features

- **Quiz Generation**: Upload a PDF or enter a URL to generate a quiz based on the content.
- **AI Tutor**: After generating a quiz, users can interact with an AI tutor that knows the content of the quiz. The AI tutor helps answer quiz questions, offering explanations and guidance, much like a personal tutor.
- **Light and Dark Mode**: Users can switch between light and dark modes to suit their preferences and improve usability in different lighting conditions.
- YouTube video quiz generation (currently under development).
- User authentication for personalized quiz tracking.
- Responsive design for both desktop and mobile users.

## How It Works

1. **Input Data**: Users provide information via PDF uploads, URLs, or YouTube links (when available).
2. **Processing**: We scrape the information then ask ChatGPT to analyze the content and generate relevant quiz questions.
3. **AI Tutor Interaction**: After the quiz is generated, users can ask the AI tutor (ChatGPT) questions about the quiz content for further understanding and explanations.
4. **Light and Dark Mode**: Users can toggle between light and dark mode to enhance their viewing experience.
5. **Output**: A set of 10 multiple-choice questions is generated, and the AI tutor is available to assist with answers.

## Screenshots

To give you a better idea of what Aceflow looks like, here are some screenshots of the application:

- **Home Page**: The entry point where users can log in, sign up, or get started.

  ![Home Page](https://github.com/user-attachments/assets/6d6c9f4a-9482-4f61-bb34-3042262da623)

- **Quiz Generation Page**: Users can upload PDFs or enter URLs to generate quizzes.

  ![image](https://github.com/user-attachments/assets/437002cf-b434-48c9-a7d8-9f1612b7cda1)
  ![image](https://github.com/user-attachments/assets/b7fcea64-d6ae-452e-aa21-433d8fcad22e)
  ![image](https://github.com/user-attachments/assets/6f2ded4e-e39d-44ef-a882-d5522109a5e9)

- **Quiz Page**: Users test their knowledge through the short quiz.

  ![image](https://github.com/user-attachments/assets/7880d1ed-c3d9-4353-8c24-55787178881e)
  ![image](https://github.com/user-attachments/assets/c62e8368-5d7e-43be-a0c8-53cef4bba5ba)
  ![image](https://github.com/user-attachments/assets/be0b4799-b1a0-4c4a-9745-cf04c3c673c6)


- **AI Tutor Interface**: After quiz generation, users can interact with the AI tutor to get help with quiz questions.

  ![image](https://github.com/user-attachments/assets/835b92dd-2ff5-4be3-9b81-d9eac9827747)

- **Light and Dark Mode**: The application supports both light and dark modes for better usability.

  ![image](https://github.com/user-attachments/assets/38dbe5ff-34ba-4dad-8b08-c961d7cfed3c)
  ![image](https://github.com/user-attachments/assets/b9b4707f-6a62-4c11-8fb8-8c571526e034)

## Getting Started

To see Aceflow in action, simply go to the live demo and start using the tool. No setup or installation required!

- Visit [Aceflow Live Demo](https://aceflow-quiz.vercel.app).
- Create an account with your Google account.
- Upload a PDF or enter a URL to generate a quiz.
- Use the AI tutor feature to get help with answering quiz questions.
- Toggle between light and dark mode to suit your preference.
- Note: YouTube video processing is not currently supported.

## Learn More

To learn more about the technologies used in Aceflow, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [OpenAI API Documentation](https://platform.openai.com/docs) - Information about using OpenAI's APIs.
- [Firebase Documentation](https://firebase.google.com/docs) - Learn about Firebase services.
- [Stripe Documentation](https://stripe.com/docs) - Learn about Stripe for payment processing.
- [Prisma Documentation](https://www.prisma.io/docs) - Guide for using Prisma ORM.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.
