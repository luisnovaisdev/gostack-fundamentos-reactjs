import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    uploadedFiles.map(async file => {
      const data = new FormData();
      data.append('file', file.file, file.name);
      try {
        const response = await api.post('/transactions/import', data);
        console.log(response.data);
      } catch (err) {
        console.log(err.response.error);
      }
    });
    history.push('/');
  }

  function submitFile(files: File[]): void {
    // TODO
    const formatedFiles = files.map<FileProps>((file: File) => {
      const formatedFile = {
        file,
        name: file.name,
        readableSize: String(file.size),
      };
      return formatedFile;
    });

    setUploadedFiles([...uploadedFiles, ...formatedFiles]);
  }

  return (
    <>
      <Header size="small" page="import" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
