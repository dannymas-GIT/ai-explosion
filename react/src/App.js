import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text } from '@chakra-ui/react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Heading>Dashboard</Heading>
          {data.map((item, index) => (
            <Box key={index} p={3} shadow="md" borderWidth="1px">
              <Text>{JSON.stringify(item)}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
