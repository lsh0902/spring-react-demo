package SpringReact.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello(){
        return "안녕 RestAPI";
    }

    @GetMapping("/api/todo-list")
    @ResponseBody
    public Todo SendTodo() {
        Todo task1 = new Todo();
        task1.setId(1);
        task1.setText("sfid");
        task1.setDone(false);
        return task1;
    }

    @GetMapping("/api/todo-array")
    @ResponseBody
    public Todo[] SendTodoArray() {

        Todo[] task = new Todo[5];
        for(int i = 1; i<=5; i++) {
            task[i-1] = new Todo();
            task[i-1].setId(i+6);
            task[i-1].setDone(false);
        }
        task[0].setText("프로젝트 생성하기");
        task[1].setText("컴포넌트 스타일링하기");
        task[2].setText("Context 만들기");
        task[3].setText("기능 구현하기");
        task[4].setText("주원이 맞이하기");

        return task;
    }

    @GetMapping("/api/upgrade")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello();
        hello.setName(name);
        return hello;
    }

    static class Hello {
        private String name;
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
    }

    static class Todo {
        private int id;
        private String text;
        private boolean done;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public boolean isDone() {
            return done;
        }

        public void setDone(boolean done) {
            this.done = done;
        }

    }
}
