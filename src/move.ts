// Please update this type as same as with the data shape.
type FolderList = Folder[];

type FileList = File[];

type File = {
  id: string;
  name: string;
};

type Folder = File & {
  files: FileList;
};

function isFolder(item: Folder | File | FileList | null): item is Folder {
  return (item as Folder).files !== undefined;
}

function findById(list: FolderList | FileList, id: string, parentIndex = -1): number[] {
  let result = [-1, parentIndex];

  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];

    if (item.id === id) {
      return [i, parentIndex];
    }

    if (isFolder(item)) {
      result = findById(item.files, id, i);
      if (result[0] > -1) return result;
    }
  }

  return result;
}

export default function move(list: FolderList, source: string, destination: string): FolderList {
  const [destIndex, destParentIndex] = findById(list, destination);
  const [sourceIndex, sourceParentIndex] = findById(list, source);

  if (sourceParentIndex === -1) {
    throw new Error('You cannot move a folder');
  }

  if (destParentIndex > -1) {
    throw new Error('You cannot specify a file as the destination');
  }

  const [file] = list[sourceParentIndex].files.splice(sourceIndex, 1);
  list[destIndex].files.push(file);

  return list;
}
