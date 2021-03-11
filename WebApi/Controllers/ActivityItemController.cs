using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace WebApi.Controllers
{
    [EnableCors("Policy1")]
    [ApiController]
    [Route("[controller]")]
    public class ActivityItemController : ControllerBase
    {
        private readonly ActivityItemContext _context;
        
        public ActivityItemController(ActivityItemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityItemDTO>>> Get()
        {
            return await _context.ActivityItems.Select(x => ItemToDTO(x)).ToListAsync();
        }
        
        [HttpGet("{key}")]
        public async Task<ActionResult<ActivityItemDTO>> GetActivityItem(int key)
        {
            var ActivityItem = await _context.ActivityItems.FindAsync(key);

            if (ActivityItem == null)
            {
                return NotFound();
            }

            return ItemToDTO(ActivityItem);
        }

        [HttpPost]
        public async Task<ActionResult<ActivityItemDTO>> CreateActivityItem(ActivityItem activityItem)
        {     
            _context.ActivityItems.Add(activityItem);
            if (!ItemExists(activityItem.Key)){
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction(
                nameof(GetActivityItem),
                new { key = activityItem.Key },
                ItemToDTO(activityItem));
            
        }

        [HttpDelete]        
        public async Task<ActionResult<IEnumerable<ActivityItemDTO>>> DeleteActivityItems(int[] activityItemKeys)
        {
            var actvityItemsToDelete = _context.ActivityItems.Where(x => activityItemKeys.Contains(x.Key));
            _context.ActivityItems.RemoveRange(actvityItemsToDelete);
            await _context.SaveChangesAsync();      
            
             return await _context.ActivityItems.Select(x => ItemToDTO(x)).ToListAsync();
        }

        private bool ItemExists(int key) => _context.ActivityItems.Any(e => e.Key == key);
        private static ActivityItemDTO ItemToDTO(ActivityItem item) => new ActivityItemDTO
        {
            Key = item.Key,
            Activity = item.Activity,
            Type = item.Type,
            Participants = item.Participants,
            Price = item.Price,
            Link = item.Link,
            Accessibility = item.Accessibility
        };

    }
}
