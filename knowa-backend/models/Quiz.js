const quizSchema = {
  id: Number,
  title: String,
  description: String,
  duration: Number,
  questions: Array,
  active: Boolean,
};

module.exports = quizSchema;