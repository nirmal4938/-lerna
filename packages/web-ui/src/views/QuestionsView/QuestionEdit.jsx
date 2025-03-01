import React, { useState } from "react";
import Modal from "../../components/OverlayProvider/Modal";
import { Card, Dropdown, Field, Grid, Input, Label, TextArea, TitleBar } from "ui-components";
import './QuestionEdit.css'
import { useQuery, useMutation } from '@apollo/client';
import { CreateQuestion } from "../../graphql/mutation";
export const QuestionEdit = () => {
    const [createQuestion] = useMutation(CreateQuestion);
    const [formData, setFormData] = useState({
        question_text: "",
        question_type: "MCQ",
        options: [{ text: "", is_correct: false }],
        correct_answer: "",
        explanation: "",
    difficulty_level: "MEDIUM",
    tags: [],
    topic: "",
    media: {
      image_url: "",
      video_url: "",
      audio_url: "",
      files: []
    },
    language: "en",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested changes (e.g., media or options)
  const handleNestedChange = (e, field, index = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (index !== null) {
        // For array-based fields like options
        const updatedArray = [...prev[field]];
        updatedArray[index][name] = value;
        return { ...prev, [field]: updatedArray };
      }
      return {
        ...prev,
        [field]: { ...prev[field], [name]: value },
      };
    });
  };

  // Add a new option
  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { text: "", is_correct: false }],
    }));
  };

  // Remove an option
  const removeOption = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      question_text: formData.question_text,
      question_type: formData.question_type,
      options: formData.options,
      correct_answer: formData.correct_answer,
      explanation: formData.explanation,
      difficulty_level: formData.difficulty_level,
      tags: formData.tags,
      topic: formData.topic,
      language: formData.language,
      media: formData.media,
    };

    try {
      console.log("questionData", questionData)
      const { data } = await createQuestion({ variables: { question: questionData } });
      console.log("Response Data:", data);
      alert("Question added successfully!");
      setFormData({
        question_text: "",
        question_type: "MCQ",
        options: [{ text: "", is_correct: false }],
        correct_answer: "",
        explanation: "",
        difficulty_level: "EASY",
        tags: [],
        topic: "",
        language: "en",
        media: { files: [] },
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the question.");
    }
  };
  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      media: { ...prev.media, files: files },
    }));
  };


  return (
    <>
    <TitleBar
          fixed
          title={`Question Details`}
          onBackClicked={() => console.log('onBackClicked')}
           />
          <div className="form-container">
      <form className="question-form" onSubmit={handleSubmit}>
        {/* Question Text */}
        <label>
          Question Text:
          <textarea
            name="question_text"
            value={formData.question_text}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </label>

        {/* Question Type */}
        <label>
          Question Type:
          <select
            name="question_type"
            value={formData.question_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="MCQ">MCQ</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="SUBJECTIVE">Subjective</option>
          </select>
        </label>

        {/* Options */}
        {formData.question_type === "MCQ" &&
          formData.options.map((option, index) => (
            <div key={index} className="form-option">
              <input
                type="text"
                name="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleNestedChange(e, "options", index)}
                required
                className="form-input"
              />
              <label className="checkbox-container">
                Correct
                <input
                  type="checkbox"
                  name="is_correct"
                  checked={option.is_correct}
                  onChange={(e) =>
                    handleNestedChange(
                      { target: { name: "is_correct", value: e.target.checked } },
                      "options",
                      index
                    )
                  }
                />
              </label>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeOption(index)}
              >
                Remove
              </button>
            </div>
          ))}
        {formData.question_type === "MCQ" && (
          <button type="button" className="add-button" onClick={addOption}>
            Add Option
          </button>
        )}

        {/* Correct Answer */}
        {formData.question_type !== "SUBJECTIVE" && (
          <label>
            Correct Answer:
            <input
              type="text"
              name="correct_answer"
              value={formData.correct_answer}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
        )}

        {/* Explanation */}
        <label>
          Explanation:
          <textarea
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            className="form-textarea"
          />
        </label>

        {/* Difficulty Level */}
        <label>
          Difficulty Level:
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
            className="form-select"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </label>

        {/* Tags */}
        <label>
          Tags (comma separated):
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
            className="form-input"
          />
        </label>

        {/* Topic */}
        <label>
          Topic:
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        {/* Media */}
        <label>
          Image URL:
          <input
            type="url"
            name="image_url"
            value={formData.media.image_url}
            onChange={(e) => handleNestedChange(e, "media")}
            className="form-input"
          />
        </label>
        <label>
          Video URL:
          <input
            type="url"
            name="video_url"
            value={formData.media.video_url}
            onChange={(e) => handleNestedChange(e, "media")}
            className="form-input"
          />
        </label>
        <label>
          Audio URL:
          <input
            type="url"
            name="audio_url"
            value={formData.media.audio_url}
            onChange={(e) => handleNestedChange(e, "media")}
            className="form-input"
          />
        </label>
 {/* Media (File upload) */}
 <label>Upload Files (Image, Video, Audio):</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            className="form-input"
          />
        {/* Language */}
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        {/* Submit */}
        <button type="submit" className="submit-button">
          Save Question
        </button>
      </form>
    </div>
          </>
  );
};
