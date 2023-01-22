import React from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [content, setContent] = React.useState([]);

  React.useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorMessage(_content);

        setContent([]);
      }
    );
  }, []);

  return (
    <div className="container">
      {
        errorMessage? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : (
          <header className="jumbotron">
            <h1>Notas Públicas</h1>
            <div>
              {content.length === 0 && (
                <div className="alert alert-info" role="alert">
                  No hay notas públicas
                </div>
              )}
              {content.map((item) => {
                return (
                  <div key={item._id} className="card">
                    <div className="card-body">
                      <h5 className="card-title bg-dark rounded p-2 text-light">{item.title}</h5>
                      <div className="card-text">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="tags align-self-end">
                          {item.tags.map((tag) => {
                            return (
                              <span key={tag} className="badge bg-secondary">
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <a href={`/notes/${item._id}`} className="btn btn-dark">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </header>
        )}
    </div>
  );
};

export default Home;