import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type DataFetched = {
  data: [
    {
      title: string;
      description: string;
      url: string;
      ts: number;
      id: string;
    }
  ];
  after: string | null;
};

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = null }): Promise<DataFetched> => {
    return api
      .get('/api/images', {
        params: {
          after: pageParam,
        },
      })
      .then(response => {
        return response.data;
      });
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastRequest => {
      return lastRequest.after !== null ? lastRequest.after : null;
    },
  });

  const formattedData = useMemo(() => {
    if (!data) {
      return [];
    }

    const flattenedData = data.pages.flatMap(pages => pages.data);
    return flattenedData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button
            mt={10}
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
