import { OutletContext } from '@/pages';
import { Button, Flex, Skeleton, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGetCategory, useMutateCategory } from './hooks';

const tagsData = ['Кино', 'Выставки', 'Рестораны', 'Путешествия'];

const { Title, Link } = Typography;

export const Category: React.FC = () => {
  const { messageApi } = useOutletContext<OutletContext>();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const handleChange = (tagId: number, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tagId] : selectedTags.filter((t) => t !== tagId);
    setSelectedTags(nextSelectedTags);
  };
  const navigate = useNavigate();
  const { isLoading, data } = useGetCategory();
  const { mutate, isLoading: isLoadingUpdate } = useMutateCategory();
  const handleClick = () => {
    mutate(
      { data: selectedTags },
      {
        onSuccess() {
          navigate('/profile');
          messageApi.success('Сохранили ваш выбор!');
        },
      },
    );
  };
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
              onClick={handleClick}
              color="default"
              loading={isLoadingUpdate}
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
