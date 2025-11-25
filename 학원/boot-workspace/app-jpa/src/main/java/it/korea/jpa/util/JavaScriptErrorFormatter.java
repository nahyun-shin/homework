package it.korea.jpa.util;

public class JavaScriptErrorFormatter {

    public static String consoleErrorMsg(ErrorInfo error) {
    return "\n" +
           "\n" +
           "    (´･_･) 이게뭐지\n" +
           "    (´っ_c) 내가 잘못봤나?\n" +
           "    (´◎ω◎) 띠용?!\n\n" +
           "    ＿人人 人人＿\n" +
           "    ＞ (´◎ω◎)  ＜ " + error.code + " 에러코드 " + error.message + " 을 확인하기!\n" +
           "    ￣Y^Y^Y^Y￣" +
           "\n" +
           "\n" ;
}

}
