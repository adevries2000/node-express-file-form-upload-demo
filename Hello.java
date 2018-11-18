import java.io.*;
public class Hello {
	public static void main(String... args) {
		try(FileReader in = new FileReader(args[0]);FileWriter out = new FileWriter(args[1])){
			for(int i=0;i<args.length;i++) {
				out.write(args[i]+"\n");
			}
		}
		
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}

