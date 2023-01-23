import './noteView.css';

import React from "react";
import { useParams } from "react-router-dom";

import NotesService from "../services/notes.service";


const Note = () => {
  const { id } = useParams();
  const [note, setNote] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    if (!id) {
      setErrorMessage("No se ha encontrado la nota");
      setNote({
        title: "No se ha encontrado la nota",
        content: "",
        tags: [],
        author: "",
      });
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      NotesService.getPublic(id).then((response) => {
        setNote({
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          author: response.data.author,
        })
      }).catch((error) => {
        setErrorMessage(error.data.message)
      });
    } else {
      NotesService.get(id).then((response) => {
        setNote({
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          author: response.data.author,
        })
      }).catch((error) => {
        setErrorMessage(error.data.message)
      });
    }
  }, [id]);

  const EditButton = () => {
    if (JSON.parse(localStorage.getItem("user"))?.id === note?.author) {
      return (
        <div className="d-flex justify-content-end">
          <a href={`/notes/${id}/edit`} className="btn btn-dark m-3">
            Edit
          </a>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="container">
      {
        errorMessage? (
          <div className="alert alert-danger" role="alert">
            {errorMessage.message}
          </div>
        ) : (
          <div>
            <header className="jumbotron">
              <div className="tags mb-3">
                {note?.tags.map((tag) => {
                  return <span key={tag} className="badge bg-secondary">{tag}</span>;
                }
                )}
              </div>
              <h1 className="title">{note?.title}</h1>
              <div className="container content">
                <div dangerouslySetInnerHTML={{ __html: note?.content }} />
              </div>
            </header>
            <EditButton />
          </div>
        )
      }
    </div>
  );
}

export default Note;