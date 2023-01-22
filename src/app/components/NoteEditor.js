import './noteCreator.css';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toggle from 'react-toggle';
import React from 'react';
import { useParams } from "react-router-dom";

import NotesService from '../services/notes.service';

import { WithContext as ReactTags } from 'react-tag-input';

const PopupConfig = ({ isPublic, setIsPublic, handleClose, handleDelete }) => {
  return (
    <div className='popup-box'>
      <div className='popup-config'>
        <h2>Configuration</h2>
        <hr></hr>
        <span className='close-btn' onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </span>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <Toggle
              id="isPublicStatus"
              defaultChecked={isPublic}
              onChange={() => {
                setIsPublic(!isPublic);
              }}
            />
            {
              isPublic ? <label htmlFor="isPublicStatus" className='ml-2'>Public</label> : <label htmlFor="isPublicStatus" className='ml-2'>Private</label>
            }
          </div>
          <button className='btn btn-danger' onClick={handleDelete}>Remove Note</button>
        </div>
      </div>
    </div>
  );
};

const MenuBarEditor = ({ editor }) => {
  if (!editor) return null

  return (
    <>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h6
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </div>
    </>
  )
}

const Tags = ({ tags, setTags }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  }

  return (
    <div className='tags'>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
        inputFieldPosition='top'
      />
    </div>
  )
}

const Editor = () => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState([])
  const [isPublic, setIsPublic] = React.useState(false)
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  const id = useParams().id

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  })

  React.useEffect(() => {
    NotesService.get(id).then((response) => {
      setTitle(response.data.title)
      if (editor)
        editor.chain().focus().setContent(response.data.content).run()
      setTags(response.data.tags.map((tag) => ({ id: tag, text: tag })))
      setIsPublic(response.data.isPublic)
    }).catch((error) => {
      console.log(error)
      setErrorMessage(error.message)
    })
  }, [id, editor])
  
  const saveNote = () => {
    NotesService.update(id, title, editor.getHTML(), tags.map((tag) => tag.text), isPublic).then(
      (response) => {
        if (response.status === 200) {
          window.location.href = `/notes/${id}`
        }
      },
      (error) => {
        setErrorMessage(error.response.data.message)
      }
    )
  }

  const togglePopupConfig = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  const handleDelete = () => {
    NotesService.remove(id).then(
      (response) => {
        if (response.status === 200) {
          window.location.href = '/user'
        }
      },
      (error) => {
        setErrorMessage(error.response.data.message)
      }
    )
  }

  return (
    <>
      <div className='row'>
        <div className='col-8'>
          <div className='title'>
            <input
              type='text'
              className='form-control'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className='col-4'>
          <div className='config d-flex justify-content-end'>
            <button
              className='btn btn-outline-secondary'
              onClick={togglePopupConfig}
            >
              config
            </button>
          </div>
        </div>
      </div>
      <MenuBarEditor editor={editor} />
      <EditorContent editor={editor} />
      <div className='row'>
        <div className='col-8'>
          <div className='tags'>
            <Tags tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className='col-4'>
          <div className='d-flex justify-content-end'>
            <button
              className='btn btn-outline-secondary publish'
              onClick={() => saveNote()}
            >
              save
            </button>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className='alert alert-danger' role='alert'>
          {errorMessage}
        </div>
      )}
      {isPopupOpen && (
        <PopupConfig
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          handleClose={togglePopupConfig}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Editor