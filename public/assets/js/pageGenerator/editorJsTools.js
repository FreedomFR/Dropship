const editorJSConfig = {
};
const BlockLayout = EditorJSLayout.LayoutBlockTool;
const editorJsTools = {
  style: EditorJSStyle.StyleInlineTool,
  paragraph: {
    config: {
      placeholder: "Insérer un texte"
    },
    inlineToolbar: false,
    tunes: ['textAlignement', 'classHandler'],
  },
  header: {
    tunes: ['textAlignement', 'classHandler'],
    class: Header,
    inlineToolbar: ['link'],
    config: {
      placeholder: 'Titre'
    },
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: PATH_EDITOR_IMG_UPLOAD, // Your backend file uploader endpoint
        byUrl: 'http://localhost:8080/', // Your endpoint that provides uploading by Url
      }
    }
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  raw: RawTool,
  marker: {
    class: Marker,
  },
  linkTool: LinkTool,
  embed: Embed,
  table: {
    tunes: ['classHandler'],
    class: Table,
    inlineToolbar: true,
  },
  // Text alignement
  textAlignement: {
    class: AlignmentBlockTune,
    config:{
      default: "left",
      blocks: {
        header: 'center',
        list: 'right'
      }
    },
  },
  // class handler
  classHandler: {
    class: classHandlerBlockTune,
    // config:{
    //   blocks: {
    //     header: 'center',
    //     list: 'right'
    //   }
    // },
  },
  // LAYOUT / columns
  layout: {
    class: BlockLayout,
    config: {
      EditorJS,
      editorJSConfig,
      enableLayoutEditing: false,
      enableLayoutSaving: true,
      initialData: {
        itemContent: {
          1: {
            blocks: [],
          },
        },
        layout: {
          type: "container",
          id: "",
          className: "",
          style: "border: 1px solid #000000; ",
          children: [
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; display: inline-block; ",
              itemContentId: "1",
            },
          ],
        },
      },
    },
    toolbox: {
      title: "1 Colonne",
    }
  },
  twoColumns: {
    class: BlockLayout,
    config: {
      EditorJS,
      editorJSConfig,
      enableLayoutEditing: false,
      enableLayoutSaving: false,
      initialData: {
        itemContent: {
          1: {
            blocks: [],
          },
          2: {
            blocks: [],
          },
        },
        layout: {
          type: "container",
          id: "",
          className: "",
          style:
            "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
          children: [
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "1",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "2",
            },
          ],
        },
      },
    },
    shortcut: "CMD+2",
    toolbox: {
      icon: `
        <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
          <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
          <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
        </svg>
      `,
      title: "2 Colonnes",
    },
  },
  ThreeColumns: {
    class: EditorJSLayout.LayoutBlockTool,
    config: {
      EditorJS,
      editorJSConfig,
      enableLayoutEditing: false,
      enableLayoutSaving: false,
      initialData: {
        itemContent: {
          1: {
            blocks: [],
          },
          2: {
            blocks: [],
          },
          3: {
            blocks: [],
          },
        },
        layout: {
          type: "container",
          id: "",
          className: "",
          style:
            "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
          children: [
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "1",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "2",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "3",
            },
          ],
        },
      },
    },
    shortcut: "CMD+3",
    toolbox: {
      icon: `
        <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
          <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
          <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
        </svg>
      `,
      title: "3 Colonnes",
    },
  },
  FourColumns: {
    class: BlockLayout,
    config: {
      EditorJS,
      editorJSConfig,
      enableLayoutEditing: false,
      enableLayoutSaving: false,
      initialData: {
        itemContent: {
          1: {
            blocks: [],
          },
          2: {
            blocks: [],
          },
          3: {
            blocks: [],
          },
          4: {
            blocks: [],
          },
        },
        layout: {
          type: "container",
          id: "",
          className: "",
          style:
            "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
          children: [
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "1",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "2",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "3",
            },
            {
              type: "item",
              id: "",
              className: "",
              style: "border: 1px solid #000000; padding: 8px; ",
              itemContentId: "4",
            },
          ],
        },
      },
    },
    shortcut: "CMD+4",
    toolbox: {
      icon: `
        <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
          <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
          <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
        </svg>
      `,
      title: "4 Colonnes",
    },
  },
}