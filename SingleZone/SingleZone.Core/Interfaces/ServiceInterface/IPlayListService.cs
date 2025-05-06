using SingleZone.Core.DTOs;
using SingleZone.Core.entities;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IPlayListService
    {
        List<PlayListDto> GetList();         // מחזיר את כל רשימת הפלייליסטים ב-DTO
        PlayListDto GetById(int id);         // מחזיר פלייליסט לפי מזהה כ-DTO
        public PlayListDto AddPlayList(PlayListDto playListDto);


        bool Update(int id, PlayListDto playListDto);  // מעדכן פלייליסט קיים ב-DTO
        bool Remove(int id);  // מסיר פלייליסט לפי מזהה
        List<PlayList> GetPlaylistsByUserId(int userId);
    }
}
