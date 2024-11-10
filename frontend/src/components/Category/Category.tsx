import { Button, Flex, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tagsData = ['Кино', 'Выставки', 'Рестораны', 'Путешествия'];

const { Title, Link } = Typography;

export const Category: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Movies']);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const navigate = useNavigate();
  return (
    <div className="my-container pt-4">
      <Title className="text-white text-center">Выберите категории:</Title>
      <Flex justify="space-between" align="center">
        {tagsData.map<React.ReactNode>((tag) => (
          <Tag.CheckableTag
            className="text-sm"
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Flex>
      <Button onClick={() => navigate('/')} color="default" variant="outlined">
        К выбору банков
      </Button>
    </div>
  );
};
