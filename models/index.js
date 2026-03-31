import Project from './Project';
import User from './User';
import Message from './Message';

export {
  Project,
  User,
  Message,
};

// همچنین می‌توانیم یک تابع کمکی برای اتصال داشته باشیم
export const getModel = (modelName) => {
  const models = {
    Project,
    User,
    Message,
  };
  return models[modelName];
};