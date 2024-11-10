import { Button, Flex, Skeleton, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategory } from './hooks';

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
  const { isLoading, data } = useGetCategory();
  return (
    <div className="my-container pt-4">
      {isLoading ? (
        <Flex className="bg-white p-4 rounded-lg">
          <Skeleton />
        </Flex>
      ) : (
        <>
          <Title className="text-white text-center">Выберите категории:</Title>
          <Flex vertical gap={10} className="mb-6" justify="center" align="center">
            {data &&
              data.map<React.ReactNode>((tag) => (
                <Tag.CheckableTag
                  className="text-xl"
                  key={tag.id}
                  checked={selectedTags.includes(tag.name)}
                  onChange={(checked) => handleChange(tag.name, checked)}
                >
                  {tag.name}
                </Tag.CheckableTag>
              ))}
          </Flex>
          <Button
            className="block mx-auto"
            size="large"
            onClick={() => navigate('/profile')}
            color="default"
            variant="outlined"
          >
            К выбору банков
          </Button>
        </>
      )}
    </div>
  );
};
