package test02;

import test02.service.BankService;

public class BankMain {

	public static void main(String[] args) {
		BankService service = new BankService();
		service.start();

	}

}
