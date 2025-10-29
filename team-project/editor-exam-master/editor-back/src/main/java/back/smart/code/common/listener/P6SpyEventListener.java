package back.smart.code.common.listener;
import java.sql.SQLException;

import back.smart.code.config.P6sypSqlFormater;
import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.event.JdbcEventListener;
import com.p6spy.engine.spy.P6SpyOptions;

public class P6SpyEventListener  extends JdbcEventListener{

    @Override
    public void onAfterConnectionClose(ConnectionInformation connectionInformation, SQLException e) {
        P6SpyOptions.getActiveInstance().setLogMessageFormat(P6sypSqlFormater.class.getName());
    }

    
}
