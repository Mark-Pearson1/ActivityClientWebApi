using System.ComponentModel.DataAnnotations;

namespace Models{

    public class ActivityItemDTO 
    {        
        public int Key { get; set; }

        public string Activity { get; set; }

        public string Type { get; set; }

        public int Participants { get; set; }

        public decimal Price { get; set; }

        public string Link { get; set; }

        public decimal Accessibility { get; set; }        

    }
}