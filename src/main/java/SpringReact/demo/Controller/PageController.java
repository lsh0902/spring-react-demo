package SpringReact.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/main")
    public String main(Model model) {
        model.addAttribute("data", "hello~@!!!!!");
        return "home";
    }
}
