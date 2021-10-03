package com.wspfeiffer.employees.health;

import io.micronaut.health.HealthStatus;
import io.micronaut.management.health.indicator.HealthIndicator;
import io.micronaut.management.health.indicator.HealthResult;
import io.micronaut.management.health.indicator.annotation.Liveness;
import io.reactivex.Flowable;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;

@Singleton
@Liveness
public class LivenessIndicator implements HealthIndicator {
    private static String LIVENESS_NAME = "liveness";

    @Override
    public Publisher<HealthResult> getResult() {
        return Flowable.just(HealthResult.builder(LIVENESS_NAME).status(HealthStatus.UP).build());
    }
}
