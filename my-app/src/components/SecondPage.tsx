

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DepartmentList from './DepartmentList';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log("User in localStorage:", user);  // Add this line to debug
    if (!user) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);
  

  // Fetch posts from the API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 450 },
  ];

  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={posts} 
          columns={columns} 
          pageSizeOptions={[5, 10, 20]} 
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 }
            }
          }}
        />
      </div>
      <Typography variant="h4">Departments</Typography>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;

