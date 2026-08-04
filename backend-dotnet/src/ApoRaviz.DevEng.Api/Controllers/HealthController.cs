using Microsoft.AspNetCore.Mvc;

namespace ApoRaviz.DevEng.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "ok" });
        }
    }
}
