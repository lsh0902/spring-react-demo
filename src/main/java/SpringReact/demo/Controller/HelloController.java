package SpringReact.demo.Controller;

import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
public class HelloController {

    private Connection conn;
    private Statement stmt;
    private ResultSet rs;

    public HelloController() {

        try{
            this.conn = DriverManager.getConnection("jdbc:mysql://localhost:3306", "root","qqqq");
            this.stmt = conn.createStatement();
            stmt.executeQuery("use todolist");
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/api/hello")
    public String hello(){
        return "안녕 RestAPI";
    }

    @GetMapping("/api/todos")
    @ResponseBody
    public Todo[] SendTodoArray() {
        try {
            rs = stmt.executeQuery("SELECT COUNT(*) FROM todo");
            int rowcount;
            Todo[] todo_list = null;
            if(rs.next()) {
                rowcount = rs.getInt(1);
                todo_list = new Todo[rowcount];
            }
            rs = stmt.executeQuery("select * from todo");
            int i = 0;
            while(rs.next()) {
                todo_list[i] = new Todo();
                todo_list[i].setId(rs.getInt("id"));
                todo_list[i].setText(rs.getString("text"));
                todo_list[i++].setDone(rs.getBoolean("done"));
            }
            return todo_list;
        } catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/api/todos")
    public void addTodoTask(@RequestBody Todo td) {

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
