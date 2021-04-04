package SpringReact.demo;

import SpringReact.demo.Controller.HelloController;

public class sss {
    public static void main(String[] args) {
        Todo[] task = new Todo[2];
        for(int i=0 ;i< 2 ;i++) {
            task[i] = new Todo();
        }
        task[0].setText("프로젝트 생성하기");
        task[1].setText("컴포넌트 스타일링하기");
        task[0].setDone(false);
        task[1].setDone(false);
        task[0].setId(1);
        task[1].setId(2);

//        Todo task1 = new Todo();
//        task1.setId(1);
//        task1.setText("sfid");
//        task1.setDone(false);

        System.out.println(task);
        System.out.println(task[0].getText());
        System.out.println(task[1].getText());
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
