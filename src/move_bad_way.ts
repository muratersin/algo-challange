type List = Folder[];

type File = {
  id: string;
  name: string;
};

type Folder = File & {
  files: File[];
};

export default function move(list: List, source: string, destination: string): List {
  let destinationIndex = -1;
  let sourceIndex = -1;
  let sourceFolderIndex = -1;

  for (let i = 0; i < list.length; i += 1) {
    const folder: Folder = list[i];
    const { files } = folder;

    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    if (folder.id === destination) {
      destinationIndex = i;
    }

    for (let j = 0; j < files.length; j += 1) {
      const file: File = files[j];

      if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === source) {
        sourceIndex = j;
        sourceFolderIndex = i;
      }
    }
  }

  const [sourceFile] = list[sourceFolderIndex].files.splice(sourceIndex, 1);
  list[destinationIndex].files.push(sourceFile);

  return list;
}
