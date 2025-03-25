type DBVideoType = {
  _id: string;
  title: string;
  author_id: string;
};

type DBAuthorType = {
  _id: string;
  firstName: string;
  lastName: string;
};

type VideoViewType = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
};

type BannedVideoType = VideoViewType & {
  banReason: string;
};

const VideoQueryRepo = {
  getVideo(): VideoViewType[] {
    const dbVideos: DBVideoType[] = [];
    const dbAuthors: DBAuthorType[] = [];

    return dbVideos.map((dbVideo) => {
      const foundAuthor = dbAuthors.find((a) => a._id === dbVideo.author_id);

      return this._mapDbVideoToAuthorViewModel(dbVideo, foundAuthor!);
    });
  },

  getVideoById(): VideoViewType {
    const dbVideo: DBVideoType = {
      _id: "234234",
      title: "Название видео",
      author_id: "898098",
    };

    const dbAuthor: DBAuthorType = {
      _id: "9984239",
      firstName: "Андрей",
      lastName: "Анучкин",
    };

    return this._mapDbVideoToAuthorViewModel(dbVideo, dbAuthor);
  },

  _mapDbVideoToAuthorViewModel(
    dbVideo: DBVideoType,
    dbAuthor: DBAuthorType
  ): VideoViewType {
    return {
      id: dbVideo._id,
      title: dbVideo.title,
      author: {
        id: dbAuthor._id,
        name: dbAuthor!.firstName + dbAuthor!.lastName,
      },
    };
  },
};
