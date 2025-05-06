using System;
using System.Collections.Generic;
using System.Linq;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Data;

namespace SingleZone.Data.Repository
{
    public class PlayListRepository : IPlayListRepository
    {
        private readonly DataContext _context;

        public PlayListRepository(DataContext context)
        {
            _context = context;
        }

        public List<PlayList> GetAll()
        {
            return _context.PlayListList.ToList();
        }

        public PlayList Add(PlayList playlist)
        {
            try
            {
                _context.PlayListList.Add(playlist);
                _context.SaveChanges();
                return playlist;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public PlayList GetById(int id)
        {
            return _context.PlayListList.FirstOrDefault(p => p.Id == id);
        }



        public int GetIndexById(int id)
        {
            return _context.PlayListList.ToList().FindIndex(p => p.Id == id);
        }

        public bool Update(PlayList playList, int id)
        {

            var existingPlaylist = _context.PlayListList.FirstOrDefault(c => c.Id == id);
            if (existingPlaylist == null) return false;


            existingPlaylist.Name = playList.Name;
            existingPlaylist.user = playList.user;
   
            


            try
            {
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }




        public bool Delete(int id)
        {
            var playList = _context.PlayListList.FirstOrDefault(c => c.Id == id);
            if (playList == null) return false;

            try
            {
                _context.PlayListList.Remove(playList);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }
        //public bool Delete(int index)
        //{
        //    try
        //    {
        //        var playLists = _context.PlayListList.ToList();

        //        if (index < 0 || index >= playLists.Count)
        //            return false;

        //        _context.PlayListList.Remove(playLists[index]);
        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}

        public List<PlayList> GetPlaylistsByUserId(int userId)
        {
            return _context.PlayListList.Where(p => p.userId == userId).ToList();
        }

    }
}
