package sh.manage;

import sh.manage.service.ManageService;

public class ManagerMain {

	public static void main(String[] args) {
		ManageService service = new ManageService();
		service.start();

	}
	

}
