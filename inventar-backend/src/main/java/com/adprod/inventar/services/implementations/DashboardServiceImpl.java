package com.adprod.inventar.services.implementations;

import com.adprod.inventar.models.*;
import org.springframework.data.mongodb.MongoExpression;
import com.adprod.inventar.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationExpression;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private MongoTemplate mongoTemplate;

    private static class DailySpendingsDTO{
        String _id;
        Double total;

        public DailySpendingsDTO(String _id, Double total) {
            this._id = _id;
            this.total = total;
        }

        public String get_id() {
            return _id;
        }

        public void set_id(String _id) {
            this._id = _id;
        }

        public Double getTotal() {
            return total;
        }

        public void setTotal(Double total) {
            this.total = total;
        }
    }

    @Override
    public ResponseEntity getDailySpendings() {
        List<AggregationOperation> aggregationResult = new ArrayList<>();
        aggregationResult.add(
                Aggregation.project("$moneySpent")
                        .andExpression("{$dateToString: { format: '%d-%m-%Y', date: '$createdTime'}}").as("day")
        );
        aggregationResult.add(Aggregation.group("$day").sum(AggregationExpression.from(MongoExpression.create("$sum: '$moneySpent'"))).as("total"));
        TypedAggregation<Spending> tempAgg = Aggregation.newAggregation(Spending.class, aggregationResult);
        List<DailySpendingsDTO> resultSR = mongoTemplate.aggregate(tempAgg, "spending", DailySpendingsDTO.class).getMappedResults();
        return ResponseEntity.ok(resultSR);
    }
}
