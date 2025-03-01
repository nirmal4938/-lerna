import { gql } from '@apollo/client';

export const CreateQuestion = gql`
  mutation create_question($question: QuestionInput!) {
    create_question(input: $question) @rest(
      type: "Question" 
      path: "quizz/insert-questions" 
      method: "POST"
      bodySerializer: "fileEncode"
    ) {
      question_text
      question_type
      options {
        text
        is_correct
      }
      correct_answer
      explanation
      difficulty_level
      tags
      topic
       media {
      image_url
      video_url
      audio_url
      files {
        filename
        url
      }
    }
      media
      language
    }
  }
`;
