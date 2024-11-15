import { Button, Flex, Skeleton, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategory, useMutateCategory } from './hooks';

const tagsData = ['Кино', 'Выставки', 'Рестораны', 'Путешествия'];

const { Title, Link } = Typography;

export const Category: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const handleChange = (tagId: number, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tagId] : selectedTags.filter((t) => t !== tagId);
    setSelectedTags(nextSelectedTags);
  };
  const navigate = useNavigate();
  const { isLoading, data } = useGetCategory();
  const { mutate } = useMutateCategory();
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
                  checked={selectedTags.includes(tag.id)}
                  onChange={(checked) => handleChange(tag.id, checked)}
                >
                  {tag.name}
                </Tag.CheckableTag>
              ))}
          </Flex>
          {selectedTags.length > 0 && (
            <Button
              className="block mx-auto"
              size="large"
              onClick={() => navigate('/profile')}
              color="default"
              variant="outlined"
            >
              К выбору банков
            </Button>
          )}
        </>
      )}
    </div>
  );
};
