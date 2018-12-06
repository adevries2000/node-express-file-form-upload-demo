public class Hello{
	public static void main(String...args){
		System.out.println("Hello from Java in Node JS");
		int i=0;
		while(i<args.length){
			System.out.println(args[i]);i++;
		}
	}
}
