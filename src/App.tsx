import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

interface TelegramUser {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
}

function App() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    gender: '',
    photoUrl: ''
  });

  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [notification, setNotification] = useState('');
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  useEffect(() => {
    // Fetch Telegram user data from the Telegram Web App
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser({
          userId: user.id.toString(),
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        photoUrl: url
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = [];
    if (!formData.childName) emptyFields.push('childName');
    if (!formData.age) emptyFields.push('age');
    if (!formData.gender) emptyFields.push('gender');
    if (!formData.photoUrl) emptyFields.push('photoUrl');

    if (emptyFields.length > 0) {
      setNotification('Заполните все поля');
      setHighlightedFields(emptyFields);
      setTimeout(() => {
        setNotification('');
        setHighlightedFields([]);
      }, 5000);
    } else {
      setNotification('');
      setHighlightedFields([]);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white flex flex-col items-center">
      {/* Header */}
      <div className="px-4 py-6 flex items-center justify-between w-full max-w-md">
        {/* Removed X icon */}
        <div className="flex items-center">
          {/* Removed Story_kids text and icon */}
        </div>
        {/* Removed three dots icon */}
      </div>

      <form onSubmit={handleSubmit} className="px-4 space-y-6 max-w-md w-full">
        {/* Photo Upload Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-6">Загрузите фото ребенка</h2>
          <div className="relative mx-auto w-32 h-32">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt="Child"
                className={`w-full h-full rounded-full object-cover border-2 ${highlightedFields.includes('photoUrl') ? 'border-red-300' : 'border-blue-500'}`}
              />
            ) : (
              <div className={`w-full h-full rounded-full flex items-center justify-center ${highlightedFields.includes('photoUrl') ? 'border-2 border-red-300' : 'border-2 border-blue-500'}`}>
                <Upload className="w-8 h-8" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
              aria-label="Upload photo"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mx-auto w-full max-w-xs">
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            placeholder="Введите имя"
            className={`w-full bg-[#2a2b36] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${highlightedFields.includes('childName') ? 'border-2 border-red-300' : ''}`}
          />

          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full bg-[#2a2b36] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${highlightedFields.includes('age') ? 'border-2 border-red-300' : ''}`}
          >
            <option value="" disabled>Выберите возраст</option>
            <option value="1">1 год</option>
            <option value="2">2 года</option>
            <option value="3">3 года</option>
            <option value="4">4 года</option>
            <option value="5">5 лет</option>
            <option value="6">6 лет</option>
            <option value="7">7 лет</option>
            <option value="8">8 лет</option>
            <option value="9">9 лет</option>
            <option value="10">10 лет</option>
            <option value="11">11 лет</option>
            <option value="12">12 лет</option>
            <option value="13">13 лет</option>
            <option value="14">14 лет</option>
            <option value="15">15 лет</option>
            <option value="16">16 лет</option>
            <option value="17">17 лет</option>
            <option value="18">18 лет</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full bg-[#2a2b36] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${highlightedFields.includes('gender') ? 'border-2 border-red-300' : ''}`}
          >
            <option value="" disabled>Выберите пол ребенка</option>
            <option value="boy">Мальчик</option>
            <option value="girl">Девочка</option>
          </select>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-lg text-lg font-medium"
          >
            Готово
          </button>
        </div>

        {notification && (
          <div className="mt-4 text-red-500 text-center">
            {notification}
          </div>
        )}

        {/* Telegram User Data */}
        <div className="mt-12 space-y-2 text-center">
          <h2 className="text-2xl font-bold mb-4">Данные пользователя Telegram:</h2>
          <p className="text-lg">User ID: {telegramUser?.userId || '-'}</p>
          <p className="text-lg">Username: {telegramUser?.username || '-'}</p>
          <p className="text-lg">First Name: {telegramUser?.firstName || '-'}</p>
          <p className="text-lg">Last Name: {telegramUser?.lastName || '-'}</p>
        </div>
      </form>
    </div>
  );
}

export default App;